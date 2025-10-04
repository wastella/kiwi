const readline = require('readline');
const https = require('https');

// Create readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prioritizes geographic locations over buildings/POIs
 * @param {Array} results - Array of geocoding results
 * @param {string} searchQuery - Original search query
 * @returns {Object} Best matching result
 */
function selectBestResult(results, searchQuery) {
  // Check if query looks like an address (contains numbers at start)
  const hasStreetNumber = /^\d+/.test(searchQuery.trim());
  
  // Priority order for location types
  const priorityTypes = [
    'house', 'building', 'residential', 'address',  // Address types
    'city', 'town', 'village', 'municipality', 'county', 
    'state', 'region', 'province', 'country', 'administrative',
    'island', 'peninsula', 'locality'
  ];
  
  const priorityClasses = [
    'building', 'place', 'boundary', 'natural', 'highway'
  ];
  
  // Extract potential country from search query
  const queryLower = searchQuery.toLowerCase();
  const commonCountries = [
    'france', 'usa', 'united states', 'uk', 'united kingdom', 'germany', 
    'spain', 'italy', 'canada', 'australia', 'japan', 'china', 'india',
    'brazil', 'mexico', 'russia', 'korea', 'netherlands', 'belgium'
  ];
  
  const mentionedCountry = commonCountries.find(country => queryLower.includes(country));
  
  // Score each result
  const scoredResults = results.map(result => {
    let score = 0;
    const type = result.type ? result.type.toLowerCase() : '';
    const resultClass = result.class ? result.class.toLowerCase() : '';
    const displayName = result.display_name ? result.display_name.toLowerCase() : '';
    
    // If query has street number, prioritize address results
    if (hasStreetNumber && (type === 'house' || type === 'building' || type === 'residential' || resultClass === 'building')) {
      score += 300;
    }
    
    // High priority for geographic location types
    if (priorityTypes.some(pt => type.includes(pt))) score += 100;
    if (priorityClasses.includes(resultClass)) score += 50;
    
    // Bonus if the country matches the search query
    if (mentionedCountry && displayName.includes(mentionedCountry)) {
      score += 200;
    }
    
    // Higher importance score from API means better match
    if (result.importance) {
      score += result.importance * 10;
    }
    
    return { result, score };
  });
  
  // Sort by score and return the highest
  scoredResults.sort((a, b) => b.score - a.score);
  return scoredResults[0].result;
}

/**
 * Makes an API request to Nominatim
 * @param {string} location - The location query
 * @returns {Promise<Array>}
 */
function makeGeocodingRequest(location) {
  return new Promise((resolve, reject) => {
    const encodedLocation = encodeURIComponent(location);
    
    const options = {
      hostname: 'nominatim.openstreetmap.org',
      path: `/search?q=${encodedLocation}&format=json&limit=5&addressdetails=1`,
      method: 'GET',
      headers: {
        'User-Agent': 'LocationToCoordinates/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const results = JSON.parse(data);
          resolve(results);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Generate fallback queries from an address
 * @param {string} location - The original location query
 * @returns {Array<string>}
 */
function generateFallbackQueries(location) {
  const queries = [location];
  
  // Check if it looks like a street address
  const hasStreetNumber = /^\d+/.test(location.trim());
  
  if (hasStreetNumber) {
    // Remove the street number: "7569 maplewood dr solon ohio" -> "maplewood dr solon ohio"
    const withoutNumber = location.replace(/^\d+\s*/, '').trim();
    if (withoutNumber) queries.push(withoutNumber);
    
    // Try to extract just the city/region: look for last 1-2 words
    const parts = location.split(/[\s,]+/).filter(p => p);
    if (parts.length >= 2) {
      // Last two words first (city, state) - more specific
      if (parts.length >= 3) {
        queries.push(`${parts[parts.length - 2]}, ${parts[parts.length - 1]}`);
      }
      
      // Last three words (might be "city name state")
      if (parts.length >= 4) {
        queries.push(`${parts[parts.length - 3]} ${parts[parts.length - 2]}, ${parts[parts.length - 1]}`);
      }
      
      // Last word only as final fallback (city)
      queries.push(parts[parts.length - 1]);
    }
  }
  
  return queries;
}

/**
 * Converts a natural language location to coordinates using Nominatim API
 * Uses fallback queries for addresses that aren't in the database
 * @param {string} location - The location in natural language
 * @returns {Promise<{lat: string, lon: string, display_name: string, fallback: boolean}>}
 */
async function geocodeLocation(location) {
  const fallbackQueries = generateFallbackQueries(location);
  
  for (let i = 0; i < fallbackQueries.length; i++) {
    const query = fallbackQueries[i];
    const results = await makeGeocodingRequest(query);
    
    if (results.length > 0) {
      const bestResult = selectBestResult(results, query);
      
      return {
        lat: bestResult.lat,
        lon: bestResult.lon,
        display_name: bestResult.display_name,
        fallback: i > 0,  // Mark if we had to use a fallback query
        fallback_level: i > 0 ? (i === 1 ? 'street' : 'city') : 'exact'
      };
    }
    
    // Add small delay between requests to respect API rate limits
    if (i < fallbackQueries.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  throw new Error('Location not found');
}

/**
 * Main function to handle user input and coordinate conversion
 */
async function main() {
  console.log('=== Location to Coordinates Converter ===\n');
  
  rl.question('Enter a location (city, address, landmark, etc.): ', async (location) => {
    if (!location.trim()) {
      console.log('Error: Please provide a valid location.');
      rl.close();
      return;
    }

    console.log(`\nProcessing location: "${location}"...\n`);

    try {
      const result = await geocodeLocation(location);
      
      console.log('✓ Coordinates found!\n');
      
      // Notify if using fallback
      if (result.fallback) {
        console.log(`⚠️  Exact address not found. Using ${result.fallback_level}-level approximation.\n`);
      }
      
      console.log('Coordinates:', `${result.lat}, ${result.lon}`);
      console.log('Location:', result.display_name);
      console.log('\nFormatted output:');
      console.log(`Latitude: ${result.lat}`);
      console.log(`Longitude: ${result.lon}`);
      
    } catch (error) {
      console.error('Error:', error.message);
      console.log('\nPlease try:');
      console.log('- Being more specific (e.g., "Eiffel Tower, Paris")');
      console.log('- Using a different format (e.g., city name, country)');
      console.log('- Checking your internet connection');
    } finally {
      rl.close();
    }
  });
}

// Run the program
main();


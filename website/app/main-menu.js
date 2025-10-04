const { spawn } = require('child_process');
const readline = require('readline');
const path = require('path');

let rl = null;

/**
 * Create or recreate readline interface
 */
function createReadlineInterface() {
  if (rl) {
    rl.close();
  }
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Runs a child script
 * @param {string} scriptPath - Path to the script to run
 */
function runScript(scriptPath) {
  // Close readline before spawning child to prevent conflicts
  if (rl) {
    rl.close();
    rl = null;
  }
  
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: __dirname
    });

    child.on('close', (code) => {
      // Recreate readline interface after child exits
      createReadlineInterface();
      
      if (code !== 0) {
        reject(new Error(`Script exited with code ${code}`));
      } else {
        resolve();
      }
    });

    child.on('error', (error) => {
      // Recreate readline interface on error
      createReadlineInterface();
      reject(error);
    });
  });
}

/**
 * Display the main menu
 */
function displayMenu() {
  console.clear();
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║                                           ║');
  console.log('║     🌍 Natural Language Input Tools 🕐     ║');
  console.log('║                                           ║');
  console.log('╚═══════════════════════════════════════════╝\n');
  console.log('Please select an option:\n');
  console.log('  [A] Location to Coordinates');
  console.log('      Convert addresses & places to GPS coordinates\n');
  console.log('  [B] Date/Time Parser');
  console.log('      Parse natural language dates & times\n');
  console.log('  [Q] Quit\n');
}

/**
 * Handle menu selection
 */
async function handleSelection(choice) {
  const choiceLower = choice.toLowerCase().trim();
  
  switch (choiceLower) {
    case 'a':
      console.log('\n🌍 Launching Location to Coordinates...\n');
      await runScript(path.join(__dirname, 'location-to-coordinates.js'));
      return true; // Continue showing menu
      
    case 'b':
      console.log('\n🕐 Launching Date/Time Parser...\n');
      await runScript(path.join(__dirname, 'datetime-parser.js'));
      return true; // Continue showing menu
      
    case 'q':
      console.log('\n👋 Goodbye!\n');
      return false; // Exit
      
    default:
      console.log('\n❌ Invalid option. Please choose A, B, or Q.\n');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return true; // Continue showing menu
  }
}

/**
 * Main menu loop
 */
async function main() {
  // Initialize readline interface
  createReadlineInterface();
  
  let running = true;
  
  while (running) {
    displayMenu();
    
    await new Promise((resolve) => {
      rl.question('Your choice: ', async (choice) => {
        try {
          running = await handleSelection(choice);
          resolve();
        } catch (error) {
          console.error('\n❌ Error:', error.message);
          console.log('\nPress Enter to continue...');
          rl.once('line', () => resolve());
        }
      });
    });
  }
  
  if (rl) {
    rl.close();
  }
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\n\n👋 Goodbye!\n');
  if (rl) {
    rl.close();
  }
  process.exit(0);
});

// Run the program
main();


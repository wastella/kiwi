# Natural Language Input Tools 🌍🕐

A collection of terminal-based utilities for converting natural language inputs into structured data.

## 📦 Tools Included

### 🌍 Location to Coordinates
Converts natural language location descriptions into GPS coordinates.

**Features:**
- Supports cities, addresses, landmarks, and regions
- Smart fallback system for addresses not in database
- Prioritizes geographic locations over buildings/POIs
- No API key required (uses free Nominatim API)

**Examples:**
```bash
Input: "San Francisco"
Output: 37.7792588, -122.4193286

Input: "7569 maplewood dr glenwillow"
Output: 41.3551524, -81.4778283

Input: "Eiffel Tower"
Output: 48.8583701, 2.2944813
```

### 🕐 Date/Time Parser
Converts natural language date/time expressions into timestamps.

**Features:**
- Handles relative dates (next friday = 12pm, 7 days from input time)
- Supports past and future expressions
- Outputs ISO 8601, Unix timestamp, and JavaScript timestamp
- Shows relative time from now

**Supported Expressions:**
- Relative: `"tomorrow"`, `"yesterday"`, `"next friday"`
- Time-based: `"in 3 days"`, `"2 weeks from now"`, `"5 days ago"`
- This/Next: `"this monday"`, `"next week"`
- Standard dates: `"2025-12-25"`, `"December 25, 2025"`

**Examples:**
```bash
Input: "next friday"
Output: Friday, October 10, 2025 at 12:00:00 PM EDT
        Unix Timestamp: 1760112000

Input: "in 3 weeks"
Output: Saturday, October 25, 2025 at 12:00:00 PM EDT
        Unix Timestamp: 1761408000

Input: "tomorrow"
Output: Sunday, October 5, 2025 at 12:00:00 PM EDT
        Unix Timestamp: 1759680000
```

## 🚀 Usage

### Interactive Menu
Launch the main menu to choose between tools:
```bash
npm run menu
# or
node app/main-menu.js
```

**Menu Options:**
- `[A]` - Location to Coordinates
- `[B]` - Date/Time Parser
- `[Q]` - Quit

### Direct Access

Run individual tools directly:

```bash
# Location to Coordinates
npm run location
# or
node app/location-to-coordinates.js

# Date/Time Parser
npm run datetime
# or
node app/datetime-parser.js
```

## 🎯 Production Ready

Both tools are designed for production use:

✅ **Single, reliable output** - Always returns one result  
✅ **Graceful error handling** - Clear feedback on failures  
✅ **No API keys required** - Uses free services  
✅ **Offline-capable** - Date/time parser works completely offline  
✅ **Smart fallbacks** - Location tool falls back to nearest match  

## 📝 Tips

### For Location Tool:
- Include state/country for better accuracy: `"7569 maplewood dr solon ohio"`
- More specific is better: `"Eiffel Tower, Paris"` vs just `"tower"`
- The tool will notify you if using an approximation

### For Date/Time Tool:
- All relative dates default to 12:00 PM (noon)
- Use specific formats for exact times: `"2025-12-25T15:30:00"`
- Supports both past (`"2 days ago"`) and future (`"in 2 weeks"`)

## 🛠️ Files

- `main-menu.js` - Main menu system
- `location-to-coordinates.js` - Location geocoding tool
- `datetime-parser.js` - Date/time parsing tool
- `README.md` - This file

## 🌐 API Usage

The location tool uses the **Nominatim API** from OpenStreetMap:
- Free to use
- No API key required
- Rate limit: ~1 request per second
- Attribution: © OpenStreetMap contributors

## 📄 License

Part of the Kiwi website project.


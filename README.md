# About the Repo

This is a repo I made for journaling and practicing the daily task I do in my DSA sessions.
This would have:

- Concise notes on important data structures and algorithmic concepts.
- Practice questions with corresponding Python solutions.
- A growing record of daily learning and problem-solving progress.

## Repository Structure

- `client/` contains the React, TypeScript, and Tailwind frontend built with Vite.
- `client/src/lib/mermaid.ts` contains the lazy Mermaid loader and renderer used by the Reader page.
- `notes/` contains topic-based notes and explanations.
- `problems/` contains combined Python files with the problem statement as a docstring comment followed by the solution code.

The journal is deployed to GitHub Pages through `.github/workflows/deploy-pages.yml`.
The frontend uses Bun for dependency installation and scripts. Install [Bun](https://bun.sh), then run:

```bash
cd client
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Frontend commands

Run these commands from `client/`:

```bash
# Install dependencies exactly from bun.lock
bun install --frozen-lockfile

# Start the Vite development server
bun run dev

# Check TypeScript without emitting files
bun run typecheck

# Create the production bundle
bun run build

# Serve the production bundle locally
bun run preview
```

The reader route uses hash routing, so local and GitHub Pages URLs have this shape:
`/#/reader?file=./notes/data-structure.md`.

### Checking common issues

1. If dependencies are missing, run `bun install --frozen-lockfile` inside `client/`.
2. If the page is blank, check the browser console and run `bun run typecheck`.
3. If a note cannot be opened, verify that `notes/manifest.json` is valid JSON and that the referenced Markdown file exists.
4. If images or notes fail after deployment, confirm that the workflow copies `notes/`, `assets/`, and `problems/` into `client/dist/`.
5. If GitHub Pages shows a 404 on a reader URL, use the hash URL (`/#/reader?...`) rather than a server-style `/reader` path.

## How to Use This Repository

1. Read the relevant topic in the **Notes** section.
2. Open a problem in `problems/` to read the question in comments and try to solve it independently.
3. Compare your approach with the Python implementation below the question comment.
4. Review the time and space complexity of the solution.

## Notes

- [**Data Structure**](notes/data-structure.md)
- [**Time and Space Complexity**](notes/time-and-space-complexity.md)

## Coding Problems

- [**Q1 - Average of Odd and Even Elements**](problems/Q1%20-%20Average%20of%20Odd%20and%20Even%20Elements.py)
- [**Q2 - First and Second Greatest Numbers**](problems/Q2%20-%20First%20and%20Second%20Greatest%20Numbers.py)
- [**Q3 - Attendance Marker**](problems/Q3%20-%20Attendance%20Marker.py)
- [**LT 217 - Contains Duplicate**](problems/LT%20217%20-%20Contains%20Duplicate.py)
- [**Q5 - Exam Scores Analysis**](problems/Q5%20-%20Exam%20Scores%20Analysis.py)
- [**Q6 - Placement Cutoff Count**](problems/Q6%20-%20Placement%20Cutoff%20Count.py)
- [**LT 34 - Find First and Last Position of Element in Sorted Array**](problems/LT%2034%20-%20Find%20First%20and%20Last%20Position%20of%20Element%20in%20Sorted%20Array.py)
- [**LT 344 - Reverse String**](problems/LT%20344%20-%20Reverse%20String.py)
- [**Q9 - Print All Pairs**](problems/Q9%20-%20Print%20All%20Pairs.py)
- [**LT 189 - Rotate Array**](problems/LT%20189%20-%20Rotate%20Array.py)
- [**GFG - Reverse an Array**](problems/GFG%20-%20Reverse%20an%20Array.py)
- [**GFG - Rotate Array**](problems/GFG%20-%20Rotate%20Array.py)
- [**GFG - Alternate positive and negative numbers**](problems/GFG%20-%20Alternate%20positive%20and%20negative%20numbers.py)
- [**GFG - Reorder an Array According to Given Indexes**](problems/GFG%20-%20Reorder%20an%20Array%20According%20to%20Given%20Indexes.py)
- [**GFG - Rearrange Array Alternately**](problems/GFG%20-%20Rearrange%20Array%20Alternately.py)
- [**GFG - Rearrange Array Such That arr[i] = i**](problems/GFG%20-%20Rearrange%20Array%20Such%20That%20arr%5Bi%5D%20%3D%20i.py)
- [**GFG - Rearrange an Array with O(1) Extra Space**](problems/GFG%20-%20Rearrange%20an%20Array%20with%20O%281%29%20Extra%20Space.py)

## Practice Guidelines

- Focus on understanding the approach rather than memorizing the code.
- Consider edge cases and test solutions with different inputs.
- Record improvements and alternative approaches as you continue practicing.

Let me know if this was helpful, feel free to star the repo 

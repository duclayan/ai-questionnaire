import { promises as fs } from 'fs';
import { importDirectory } from '@iconify/tools/lib/import/directory';
import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup';
import { runSVGO } from '@iconify/tools/lib/optimise/svgo';

// Directory containing your SVG logos
const sourceDir = 'input'; // Use absolute or relative path as needed
// Output file
const targetFile = 'output/logos.json';

(async () => {
  // Import all SVGs from the directory
  const iconSet = await importDirectory(sourceDir, {
    prefix: 'logo', // Change this prefix as needed
  });

  // Validate, clean up, and optimize each SVG
  iconSet.forEachSync((name, type) => {
    if (type !== 'icon') {
      return;
    }

    const svg = iconSet.toSVG(name);
    if (!svg) {
      // Invalid icon, remove it from the set
      iconSet.remove(name);
      return;
    }

    try {
      cleanupSVG(svg);
      runSVGO(svg);
    } catch (err) {
      console.error(`Error processing icon "${name}":`, err);
      iconSet.remove(name);
      return;
    }

    // Update icon in the set
    iconSet.fromSVG(name, svg);
  });

  // Export as Iconify JSON
  const exported = JSON.stringify(iconSet.export(), null, 2);
  await fs.writeFile(targetFile, exported, 'utf8');
  console.log(`Exported to ${targetFile}`);
})();

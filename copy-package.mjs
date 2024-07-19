import { promises as fs } from 'fs';
import path from 'path';
import promptSync from 'prompt-sync';

const prompt = promptSync();

// Resolve paths relative to the script location
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Correct the source and destination directory paths
const sourceDir = path.resolve(__dirname, '../node_modules/@cybertale/form/src');
const destDir = path.resolve(__dirname, '../src/@cybertale/form');

// Create the destination directory if it doesn't exist
const ensureDir = async (dir) => {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
};

// Function to copy files and directories
const copyFiles = async (source, destination) => {
  try {
    const files = await fs.readdir(source, { withFileTypes: true });

    await ensureDir(destination);

    for (const file of files) {
      const sourceFile = path.join(source, file.name);
      const destFile = path.join(destination, file.name);

      if (file.isFile()) {
        await fs.copyFile(sourceFile, destFile);
        console.log(`Copied: ${sourceFile} -> ${destFile}`);
      } else if (file.isDirectory()) {
        // Recursively copy directories
        await copyFiles(sourceFile, destFile);
      }
    }
  } catch (err) {
    console.error('Error copying files:', err);
  }
};

// Check if the destination directory already exists
const checkAndCopy = async () => {
  try {
    // Ensure destination directory exists or create it
    await ensureDir(destDir);

    const destExists = (await fs.readdir(destDir)).length > 0;

    if (destExists) {
      const response = prompt('The destination directory already exists. Do you want to overwrite it? (yes/no): ').toLowerCase();
      if (response !== 'yes') {
        console.log('Operation cancelled.');
        return;
      }

      // Empty the destination directory before copying
      await fs.rm(destDir, { recursive: true, force: true });
      await ensureDir(destDir);
    }

    // Start copying files
    await copyFiles(sourceDir, destDir);
    console.log('Files copied successfully.');

  } catch (err) {
    console.error('Error during the copy process:', err);
  }
};

// Start the process
checkAndCopy();

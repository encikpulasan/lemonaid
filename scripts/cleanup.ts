#!/usr/bin/env -S deno run -A

/**
 * Cleanup script to remove boilerplate-specific files and folders
 * Run this after using Fresh Lemonaid as a template to remove
 * template-specific documentation and examples.
 */

const filesToRemove = [
  "BOILERPLATE.md",
  "TEMPLATE_USAGE.md",
  "SETUP.md",
  "AI_PROJECT_SETUP_GUIDE.md",
  "AI_EFFICIENCY_IMPROVEMENTS.md",
];

const foldersToRemove = [
  "wiki",
  "exported_docs",
  "examples",
];

async function removeFile(path: string): Promise<void> {
  try {
    await Deno.remove(path, { recursive: true });
    console.log(`✅ Removed: ${path}`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log(`⚠️  Not found (already removed): ${path}`);
    } else {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error removing ${path}:`, message);
    }
  }
}

async function removeFolder(path: string): Promise<void> {
  try {
    await Deno.remove(path, { recursive: true });
    console.log(`✅ Removed folder: ${path}/`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log(`⚠️  Not found (already removed): ${path}/`);
    } else {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error removing ${path}/:`, message);
    }
  }
}

async function main() {
  console.log("🧹 Cleaning up boilerplate files...\n");

  // Remove files
  console.log("Removing documentation files:");
  for (const file of filesToRemove) {
    await removeFile(file);
  }

  // Remove folders
  console.log("\nRemoving folders:");
  for (const folder of foldersToRemove) {
    await removeFolder(folder);
  }

  console.log("\n✨ Cleanup complete!");
  console.log("\n📝 Next steps:");
  console.log("   1. Update README.md with your project information");
  console.log("   2. Update routes/_app.tsx with your app title");
  console.log("   3. Customize your project as needed");
  console.log("   4. Remove this cleanup script if desired");
}

if (import.meta.main) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    Deno.exit(1);
  });
}


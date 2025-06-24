import { readFileSync } from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import PageHeaderSection from '@/components/layout/page-header-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ChangelogEntry {
  version: string;
  changes: {
    id: string;
    description: string;
  }[];
}

const parseChangelog = (content: string): ChangelogEntry[] => {
  const entries: ChangelogEntry[] = [];
  const lines = content.split('\n');

  let currentEntry: Partial<ChangelogEntry> | null = null;

  for (const line_ of lines) {
    const line = line_.trim();

    // Match version headers like "## 0.6.0"
    const versionMatch = line.match(/^##\s+(\d+\.\d+\.\d+)/);

    if (versionMatch) {
      // Save previous entry if exists
      if (currentEntry && currentEntry.version) {
        entries.push({
          version: currentEntry.version,
          changes: currentEntry.changes || [],
        });
      }

      // Start new entry
      currentEntry = {
        version: versionMatch[1],
        changes: [],
      };
    }

    // Match change entries like "- e4f4ae8: fixed manifest path"
    if (currentEntry && /^-\s+[\da-f]+:/.test(line)) {
      const changeMatch = line.match(/^-\s+([\da-f]+):\s+(.+)/);
      if (changeMatch) {
        currentEntry.changes = currentEntry.changes || [];
        currentEntry.changes.push({
          id: changeMatch[1],
          description: changeMatch[2].trim(),
        });
      }
    }
  }

  // Don't forget the last entry
  if (currentEntry && currentEntry.version) {
    entries.push({
      version: currentEntry.version,
      changes: currentEntry.changes || [],
    });
  }

  return entries;
};

export default async function ChangelogPage() {
  const filePath = path.join(process.cwd(), 'CHANGELOG.md');
  const fileContents = readFileSync(filePath, 'utf8');

  const { content } = matter(fileContents);

  const changelogs = parseChangelog(content);
  console.log('changelogs :>>', changelogs);
  return (
    <main className="mb-5 w-full space-y-8">
      <PageHeaderSection
        title="Changelogs"
        description="Stay up to date with the latest features and improvements"
      />
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        {changelogs.map((changelog, index) => (
          <Card
            key={changelog.version}
            className={index === 0 ? 'border-green-500' : ''}
          >
            <CardHeader>
              <CardTitle>
                <span className="text-muted-foreground text-sm">Version: </span>
                {changelog.version}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {changelog.changes.map(change => (
                <div key={change.id} className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm">
                    {change.id}
                  </span>
                  <p>{change.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

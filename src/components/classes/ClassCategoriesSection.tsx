/**
 * ClassCategoriesSection Component
 * Displays class categories and available classes
 * Extracted from /clases/page.tsx to reduce main page size
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { standardClassCategories, totalStandardClasses } from '@/lib/data/classes-page-data';

export function ClassCategoriesSection() {
  return (
    <Card className="card mb-12">
      <CardHeader>
        <CardTitle className="text-gold-400 text-xl">
          Clases disponibles ({totalStandardClasses})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {standardClassCategories.map((category) => (
          <details key={category.title} open={category.defaultOpen}>
            <summary className="cursor-pointer text-gold-400 font-semibold hover:text-gold-300 transition-colors py-2">
              {category.title}
              {category.source && <span className="text-dungeon-400 text-sm ml-2">({category.source})</span>}
              <span className="text-dungeon-400 text-sm ml-2">[{category.classes.length}]</span>
            </summary>
            <div className="pl-4 py-2 bg-dungeon-900/30 rounded mt-2 p-3">
              <div className="flex flex-wrap gap-2">
                {category.classes.map((className) => (
                  <span
                    key={className}
                    className="px-3 py-1 bg-dungeon-700 text-dungeon-200 rounded text-sm hover:bg-gold-500/20 hover:text-gold-400 transition-colors"
                  >
                    {className}
                  </span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </CardContent>
    </Card>
  );
}

'use server';
import { DataResult } from '@/app/utils/types';
import { promises as fs } from 'fs';
import path from 'path';

export async function exportCsv(items: DataResult[]) {
  const csvRows = [
    ['Name', 'Height', 'Weight', 'Image URL'],
    ...items.map((item: DataResult) => [
      item.name,
      item.height,
      item.weight,
      item.sprites.other.dream_world.front_default,
    ]),
  ];

  const csvContent = csvRows.map((row) => row.join(',')).join('\n');
  const filePath = path.join(process.cwd(), 'public', 'export.csv');
  await fs.writeFile(filePath, csvContent, 'utf-8');
  return '/export.csv';
}

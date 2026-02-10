import { seedAll } from '@/db/seed';

export async function GET() {
  try {
    await seedAll();
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 },
    );
  }
}

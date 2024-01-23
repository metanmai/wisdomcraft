import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
	try {
		await db.category.createMany({
			data: [
				{ name: 'Web Development' },
				{ name: 'Mobile App Development' },
				{ name: 'Programming Languages' },
				{ name: 'Game Development' },
				{ name: 'Entrepreneurship' },
				{ name: 'Finance' },
				{ name: 'Marketing' },
				{ name: 'Project Management' },
				{ name: 'IT Certification' },
				{ name: 'Network and Security' },
				{ name: 'Operating Systems' },
				{ name: 'Databases' },
				{ name: 'Graphic Design' },
				{ name: 'Web Design' },
				{ name: 'UX/UI Design' },
				{ name: '3D and Animation' },
				{ name: 'Personal Finance' },
				{ name: 'Productivity' },
				{ name: 'Leadership' },
				{ name: 'Communication Skills' },
				{ name: 'Digital Marketing' },
				{ name: 'Social Media Marketing' },
				{ name: 'Content Marketing' },
				{ name: 'SEO (Search Engine Optimization)' },
				{ name: 'Yoga' },
				{ name: 'Fitness' },
				{ name: 'Nutrition' },
				{ name: 'Meditation' },
				{ name: 'Instruments' },
				{ name: 'Music Production' },
				{ name: 'Vocal Training' },
				{ name: 'Music Theory' },
				{ name: 'Digital Photography' },
				{ name: 'Photo Editing' },
				{ name: 'Portrait Photography' },
				{ name: 'Landscape Photography' },
				{ name: 'Learning Languages' },
				{ name: 'Language Certification' },
				{ name: 'Science' },
				{ name: 'Math' },
				{ name: 'Humanities' },
				{ name: 'Test Preparation' },
				{ name: 'Cooking' },
				{ name: 'Travel' },
				{ name: 'Fashion' },
				{ name: 'Home Improvement' }
			]
		})

		console.log(`Seeding completed successfully`);
	}

	catch(err) {
		console.log(err);
	}

	finally {
		await db.$disconnect()
	}
}

main().then(r => console.log(r))

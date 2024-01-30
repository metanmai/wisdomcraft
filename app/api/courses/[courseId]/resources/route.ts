import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

export async function POST(req: Request, {params}: {params: {courseId: string}}) {
	try {
		const {userId} = auth();
		const {url} = await req.json();

		if(!userId) {
			return new NextResponse("Unauthorized", {status: 401});
		}

		const courseOwner = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId: userId
			}
		});

		if(!courseOwner) {
			return new NextResponse("Unauthorized", {status: 401});
		}

		const attachment = await db.attachment.create({
			data: {
				url,
				courseId: params.courseId,
				name: url.split("/").pop()
			}
		});

		return NextResponse.json(attachment);

	} catch (error) {
		console.log("COURSE ATTACHMENT ERROR: ", error);
		return new NextResponse("Internal Server Error", {status: 500});
	}
}
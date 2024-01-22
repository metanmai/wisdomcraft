import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

// params should be the second argument.
export async function PATCH(req: Request, {params}: {params: {courseId: string}}) {
    try {
        const {userId} = auth();
        const values = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

		const course = await db.course.update({
			where: {
				id: params.courseId,
				userId
            },
			data: values
		});

		return new NextResponse(JSON.stringify(course), {status: 200});
    }

    catch(error) {
		console.log(`[COURSE_ID] PATCH ERROR: ${error}`);
		return new NextResponse(`Internal Server Error: ${error}`, {status: 500});
	}
}
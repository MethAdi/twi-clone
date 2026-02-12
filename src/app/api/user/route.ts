import {NextRequest,NextResponse}   from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const username = request.nextUrl.searchParams.get("username");
    if(!username)
    {
        return NextResponse.json({success:false,message:"Username is required"}, {status:400});
    }
    try {
        
        const user = await prisma.user.findFirst({
            where:{username:username},
        });
        if(!user)
        {
            return NextResponse.json({success:false,message:"User not found"}, {status:404});
        }
        return NextResponse.json({success:true,user});
    } 
    catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({success:false,message:"Internal server error"}, {status:500});
    }
}
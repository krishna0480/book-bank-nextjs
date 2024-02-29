import { writeFile,} from "fs/promises";
import { NextRequest, NextResponse } from "next/server";


export async function POST (request:NextRequest){
  const data = await request.formData()
  console.log(data)
  const file: File| null = data.get('file') as  unknown as File
  if(!file){
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const path= `./public/${file.name}`

  console.log(path);

  await writeFile(path, buffer)
   
  return NextResponse.json({"message":"file uploaded",success:true,path:path})
   
}
import Image from "next/image"
import Link from "next/link"
import Title from "../components/Title"

export default function Custom500() {
  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
      <Title title={"An Error Occured"} />
    <Image src="/images/undraw_bug_fixing_oc7a.png" alt="fixing" width={400} height={400} layout="fixed" objectFit="cover"/>
    <h1 className="text-color5">An error occurred.</h1>
    <Link href="/dashboard" >
      <a className="text-color5">Back to home</a>
    </Link>
  </div>)
}
import Image from "next/image"
import Link from "next/link"
import Title from "../components/Title"

const NotFound = () => {
  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center m-0 p-0">
      <Title title={"404 Page Not Found"} />
      <Image src="/images/undraw_Page_not_found_re_e9o6.png" alt="fixing" width={400} height={400} layout="fixed" objectFit="cover"/>
      <h1 className="text-color5">PAGE NOT FOUND</h1>
      <Link href="/dashboard" >
        <a className="text-color5">Back to home</a>
      </Link>
    </div>
  )
}
export default NotFound
import Link from "next/link"
import UserProfile from "../../components/UserProfile"
import { getAllEditorials } from "../../utils/contentParser"
import EditorialCard from "../../components/EditorialCard"
import Header from "@/components/Header"

export default function ProfilePage() {
    const editorials = getAllEditorials()
    const categories = [...new Set(editorials.map((e) => e.frontmatter.category))].filter(Boolean)
  const allTags = [...new Set(editorials.flatMap((e) => e.frontmatter.tags || []))].filter(Boolean)
  
  return (
    <div>
    
      <Header></Header>
      <UserProfile />
      </div>
  )
}

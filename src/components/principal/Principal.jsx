import { Link } from "react-router-dom"

export const Principal = () => {
  const driveLink = "zzhelp"

  return (
    <div>
      <Link to={`/environment?environment=${driveLink}`}>{driveLink}</Link>
      <br />
      <Link to={`/edit?environment=${driveLink}`}>edit</Link>
    </div>
  )
}

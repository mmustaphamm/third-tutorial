const adminAccessControl = (requiredRole) => {
  return (request, response, next) => {
    try {

        const admin = request.admin.role
        if(!requiredRole.includes(admin)) {
            return response.status(403).json({ message: "Access denied"})
        }
        next() 
    } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "Internal server error"})
    }
  }
}

module.exports = adminAccessControl
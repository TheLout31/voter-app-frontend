export const checkTokenExpiry = () => {
      const token = localStorage.getItem("accessToken");
      if(!token){
        navigate("/signin");
      }
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          navigate("/signin");
        }
      }
    };
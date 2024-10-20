import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
      if (!token) {
        console.log("NO TOKEN TOKEN")
        router.push("/login");
        
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token"); // Remove expired token
        router.push("/login"); // Redirect to login if token is expired
        console.log("TOKEN: :", localStorage.getItem("token"));
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/login"); // Redirect to login if token is invalid
    }
  }, [router]);
  return null;
};

export default useAuth;

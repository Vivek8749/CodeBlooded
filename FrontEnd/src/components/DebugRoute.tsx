import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../utils/auth";

export function DebugRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<string | null>(null);

  useEffect(() => {
    const t = getToken("token");
    const ud = getToken("userData");
    setToken(t);
    setUserData(ud);

    console.log("Debug Info:");
    console.log("- Current Location:", location.pathname);
    console.log("- Token:", t);
    console.log("- User Data:", ud);
    console.log("- State:", location.state);
  }, [location]);

  return (
    <div style={{ padding: "20px", background: "#f0f0f0" }}>
      <h1>Debug Route Information</h1>
      <p>
        <strong>Current Path:</strong> {location.pathname}
      </p>
      <p>
        <strong>Has Token:</strong> {token ? "Yes" : "No"}
      </p>
      <p>
        <strong>User Data:</strong> {userData || "None"}
      </p>
      <p>
        <strong>Location State:</strong> {JSON.stringify(location.state)}
      </p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{ margin: "5px", padding: "10px" }}
        >
          Go to Login
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ margin: "5px", padding: "10px" }}
        >
          Go to Dashboard (legacy)
        </button>
        <button
          onClick={() => {
            const ud = getToken("userData");
            if (ud) {
              try {
                const user = JSON.parse(ud);
                navigate(`/user/${user._id}/dashboard`);
              } catch (e) {
                alert("Error parsing user data");
              }
            }
          }}
          style={{ margin: "5px", padding: "10px" }}
        >
          Go to User Dashboard
        </button>
      </div>
    </div>
  );
}

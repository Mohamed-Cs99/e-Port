import { useState } from "react";
import { Card, Spacer, Button, Text, Input, Link } from "@nextui-org/react";
import Box from "@/styles/Box";
import { FormEvent } from "react";
import { auth } from "../../services";

export default function Login() {
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(""),
    login = (e: FormEvent) => {
      e.preventDefault();

      auth.admin.login(username, password).then((user) => {
        if (!user.error) {
          setError("");
          window.location.href = "/supervisor";
        } else {
          setError(user.error);
        }
      });
    };

  return (
    <>
      <Card
        css={{
          mw: "420px",
          p: "20px",
        }}
      >
        <Text
          size={24}
          weight="bold"
          css={{
            as: "center",
            mb: "20px",
          }}
        >
          Supervisor Login
        </Text>

        <form onSubmit={login} method="POST">
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Spacer y={1} />

          <Input.Password
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer y={1} />
          <Box css={{ textAlign: "center" }}>
            <Button type="submit" css={{ width: "50px", margin: "auto", mb: "$5" }}>
              Sign in
            </Button>
            <Link href="/SignIn">Login as Resident</Link>
          </Box>
        </form>
      </Card>

      {error && (
        <Box css={{ justifyContent: "center", d: "flex", mt: "$5" }}>
          <Card css={{ mw: "420px", p: "20px", color: "$error" }}>{error}</Card>
        </Box>
      )}
    </>
  );
}

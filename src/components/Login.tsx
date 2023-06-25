import { useState } from "react";
import { Card, Spacer, Button, Text, Input, Link } from "@nextui-org/react";
import Box from "@/styles/Box";
import { FormEvent } from "react";
import { auth } from "../services";

export default function Login() {
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState<any>({}),
    login = (e: FormEvent) => {
      e.preventDefault();

      auth.user
        .login(username, password)
        .then((user) => {
          setError(null);
          window.location.href = "/";
        })
        .catch(({ response }) => {
          setError(response.data);
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
          Login
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
            <Button
              type="submit"
              css={{ width: "50px", margin: "auto", mb: "$5" }}
            >
              Sign in
            </Button>
            <Link href="/supervisor/login">Login as Supervisor</Link>
          </Box>
        </form>
      </Card>

      {error && Object.keys(error).length > 0 && (
        <Box css={{ justifyContent: "center", w: "100%", d: "flex", mt: "$5" }}>
          <Card css={{ mw: "420px", p: "20px", color: "$error" }}>
            <Box as="ul" css={{ my: 0, pl: "$10" }}>
              {Object.keys(error as []).map((k) => {
                return <li>{(error as [])[k]}</li>;
              })}
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}

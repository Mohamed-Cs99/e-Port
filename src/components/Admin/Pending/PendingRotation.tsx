import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Text } from "@nextui-org/react";
import { axios } from "@/src/services";
import Modal from "../../Modal";
import Message from "../../Message";
import Box from "@/styles/Box";
import Loading from "../../Loading";

export default function Pending() {
  const [isLoaded, setLoaded] = useState(false),
    [pendingData, setPendingData] = useState([]),
    [selectedId, setSelectedId] = useState(null),
    [inView, setView] = useState<any>(null),
    [modal, setModal] = useState<{
      open: boolean;
      title?: string | null;
      content?: any;
      route?: string | null;
    }>({
      open: false,
      title: null,
      content: null,
      route: null,
    });

  const onConfirm = () => {
      axios.post(modal.route as any, { id: selectedId }).then((response) => {
        window.location.reload();
      });
    },
    onClose = () => {
      setSelectedId(null);
      setModal({
        open: false,
        route: null,
      });
    };
  if (!isLoaded) {
    if (pendingData.length === 0) {
      axios.get("/pendingRotation").then(({ data }) => {
        setLoaded(true);
        setPendingData(data);
      });
    }
  }

  return isLoaded ? (
    pendingData.length > 0 ? (
      <>
        {inView ? (
          <>
            <Box css={{ d: "flex", justifyContent: "space-between", mt: "$5" }}>
              <Box>
                <Button
                  onClick={() => {
                    setView(null);
                  }}
                  size={"md"}
                  css={{ mb: "$5" }}
                  auto
                >
                  Back
                </Button>
              </Box>
              <Box css={{ d: "flex", justifyContent: "flex-end" }}>
                <Button
                  color="success"
                  size={"md"}
                  auto
                  shadow
                  css={{ mr: "$5" }}
                  onClick={() => {
                    setSelectedId(inView.Rotation.id);
                    setModal({
                      open: true,
                      route: "acceptRotation",
                      content: "Are you sure you want to accept this rotation?",
                    });
                  }}
                >
                  Accept
                </Button>
                <Button
                  color="error"
                  size={"md"}
                  onClick={() => {
                    setSelectedId(inView.Rotation.id);
                    setModal({
                      open: true,
                      route: "rejectRotation",
                      content: "Are you sure you want to reject this rotation?",
                    });
                  }}
                  auto
                  shadow
                >
                  Reject
                </Button>
              </Box>
            </Box>
            <Card css={{ padding: "$10" }}>
              <Box
                as={"ul"}
                css={{
                  listStyle: "none",
                  $$listBorder: "2px solid $colors$gray200",
                  border: "$$listBorder",
                  m: 0,
                  p: 0,
                  borderRadius: "5px",
                  overflow: "hidden",
                  ">li": {
                    d: "flex",
                    "&:nth-child(odd) > div": {
                      backgroundColor: "$gray100",
                    },

                    "&:not(:first-of-type)": {
                      borderTop: "$$listBorder",
                    },
                    ">div": {
                      d: "inline-block",
                      padding: "$8",

                      "&:first-of-type": {
                        borderRight: "$$listBorder",
                        fontWeight: "500",
                        width: "20%",
                        d: "flex",
                        alignItems: "center",
                      },
                      "&:last-of-type": {
                        width: "100%",
                      },
                      "&:last-of-type ul": {
                        p: "0 $10",
                        overFlow: "hidden",
                        borderRadius: "5px",
                        width: "auto",
                        li: {
                          padding: "$5",
                          "&:nth-child(odd)": {
                            backgroundColor: "$gray300",
                            borderRadius: "5px",
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <Box as={"li"}>
                  <Box>Rotation ID</Box>
                  <Box>{inView.Rotation.id}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Rotation Name</Box>
                  <Box>{inView.Rotation.name}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Start Date</Box>
                  <Box>{inView.Rotation.startDate}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>End Date</Box>
                  <Box>{inView.Rotation.endDate}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Stage</Box>
                  <Box>
                    {inView.Rotation.year === 1
                      ? "Residency Year 1"
                      : inView.Rotation.year === 2
                      ? "Residency Year 2"
                      : "Residency Year 3"}
                  </Box>
                </Box>
                <Box as={"li"}>
                  <Box>Academic Supervisor</Box>
                  <Box>{inView.Rotation.academicSupervisor}</Box>
                </Box>
                <Box as={"li"}>
                  <Box>Clinical Supervisor</Box>
                  <Box>{inView.Rotation.clinicalSupervsior}</Box>
                </Box>
              </Box>
            </Card>
          </>
        ) : (
          <Table
            striped
            sticked
            selectionMode="single"
            css={{
              height: "auto",
              minWidth: "100%",
              "tbody:before": {
                content: "",
                marginBottom: "$5",
                display: "block",
              },
            }}
          >
            <Table.Header>
              <Table.Column>Rotation ID</Table.Column>
              <Table.Column>Resident ID</Table.Column>
              <Table.Column>Resident Name</Table.Column>
              <Table.Column>Resident Email</Table.Column>
              <Table.Column>Residency Year</Table.Column>
              <Table.Column>Creation Date</Table.Column>
              <Table.Column align="center">Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {(pendingData as any).map((_rotation) => {
                const Rotation = _rotation.Rotation,
                  Resident = _rotation.Resident;
                return (
                  <Table.Row key={Rotation.id}>
                    <Table.Cell>{Rotation.id}</Table.Cell>
                    <Table.Cell>{Resident.NID}</Table.Cell>
                    <Table.Cell>{Resident.name}</Table.Cell>
                    <Table.Cell>{Resident.email}</Table.Cell>
                    <Table.Cell>{Resident.residencyYear}</Table.Cell>
                    <Table.Cell>{Rotation.creationDate}</Table.Cell>
                    <Table.Cell>
                      <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                          <Button
                            color="success"
                            size={"xs"}
                            auto
                            shadow
                            onClick={() => {
                              setSelectedId(Rotation.id);
                              setModal({
                                open: true,
                                route: "acceptRotation",
                                content:
                                  "Are you sure you want to accept this rotation?",
                              });
                            }}
                          >
                            Accept
                          </Button>
                        </Col>
                        <Col css={{ d: "flex" }}>
                          <Button
                            color="error"
                            size={"xs"}
                            onClick={() => {
                              setSelectedId(Rotation.id);
                              setModal({
                                open: true,
                                route: "rejectRotation",
                                content:
                                  "Are you sure you want to reject this rotation?",
                              });
                            }}
                            auto
                            shadow
                          >
                            Reject
                          </Button>
                        </Col>
                        <Col css={{ d: "flex" }}>
                          <Button
                            color="primary"
                            size={"xs"}
                            onClick={() => {
                              setView({
                                Rotation,
                              });
                            }}
                            auto
                            shadow
                          >
                            View
                          </Button>
                        </Col>
                      </Row>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
        <Modal
          open={modal.open}
          title={modal.title}
          onClose={onClose}
          onConfirm={onConfirm}
          closeText="Cancel"
          confirmText="Ok"
        >
          <Text
            size={15}
            css={{
              padding: "$10 0 0",
              textAlign: "center",
              fontWeight: "$medium",
            }}
          >
            {modal.content}
          </Text>
        </Modal>
      </>
    ) : (
      <Box css={{ maxW: "500px", margin: "auto" }}>
        <Message message="There are no pending rotations." icon="info" />
      </Box>
    )
  ) : (
    <Loading color={"primary"} />
  );
}

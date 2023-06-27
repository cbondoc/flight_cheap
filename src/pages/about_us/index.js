import Layout from "../../components/layout/Layout";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Avatar,
  Link,
  Container,
  Typography,
  Box,
  Stack,
  CardContent,
  Card,
  CardHeader,
  Divider,
} from "@mui/material";

import Image from "next/image";

const devTeam = [
  {
    id: 3,
    name: "Cary",
    role: "Team Leader / Frontend",
    picture: "cary.jpg",
  },
  {
    id: 5,
    name: "Francely",
    role: "Assistant Team Leader / Backend",
    picture: "franceley.jpg",
  },
  {
    id: 4,
    name: "Paul John",
    role: "Full Stack Developer",
    picture: "paul.png",
  },
  {
    id: 2,
    name: "Rocky",
    role: "Frontend Developer",
    picture: "rocky.jpg",
  },
  {
    id: 1,
    name: "Ezekiel",
    role: "Frontend Developer",
    picture: "ezekiel.png ",
  },
  {
    id: 1,
    name: "Starsky",
    role: "Backend Developer",
    picture: "starsky.jpg",
  },
];

const devTeamContributors = [
  {
    id: 2,
    name: "Cedric",
    role: "Frontend Developer",
    picture: "cedric.jpg",
  },
  {
    id: 6,
    name: "Romart",
    role: "Frontend Developer",
    picture: "romart.jpg",
  },
];

const AboutUs = () => {
  const FlightCheapLogoOnlyTransparent = "/FlightCheapLogoOnlyTransparent.png";
  return (
    <Layout>
      {/* Hero unit */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h1" align="center" gutterBottom>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src={FlightCheapLogoOnlyTransparent}
              alt="Cheap Flight Logo"
              width={150}
              height={150}
            />
          </Box>
          FlightCheap
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography align="center" variant="h4" color="text.secondary">
            Cheapest Flight Fare Finder
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="sm">
        <Divider sx={{ mt: 8, mb: 8 }} />
      </Container>

      <Container maxWidth="sm">
        <Typography
          variant="h1"
          align="center"
          color="text.primary"
          sx={{ mb: 4 }}
        >
          Our Goal
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          To provide affordable flight fares to our customers without
          compromising on the quality of service and convenience, making air
          travel accessible and budget-friendly for everyone.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        ></Stack>
      </Container>
      {/* End hero unit */}

      <Container maxWidth="sm">
        <Divider sx={{ mt: 8, mb: 8 }} />
      </Container>

      <Typography
        component="h1"
        variant="h1"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Meet the Team
      </Typography>

      {/* Avatar */}

      <Grid
        sx={{
          textAlign: "center !important",
        }}
        container
        spacing={2}
        pl={8}
        pr={8}
        pb={8}
      >
        {devTeam.map((persons, index) => (
          <Grid item xs={12} sm={4} key={persons.id}>
            <Card>
              <CardContent>
                <Avatar
                  src={`/about-us/${persons.picture}`}
                  sx={{
                    margin: "auto",
                    width: 125,
                    height: 125,
                  }}
                />
                <CardHeader title={persons.name} subheader={persons.role} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography
        component="h1"
        variant="h1"
        align="center"
        color="text.primary"
        gutterBottom
      >
        With Contributions From
      </Typography>

      {/* Avatar */}

      <Grid
        sx={{
          textAlign: "center !important",
        }}
        container
        spacing={2}
        pl={8}
        pr={8}
        pb={8}
      >
        {devTeamContributors.map((persons, index) => (
          <Grid item xs={12} sm={4} key={persons.id}>
            <Card>
              <CardContent>
                <Avatar
                  src={`/about-us/${persons.picture}`}
                  sx={{
                    margin: "auto",
                    width: 125,
                    height: 125,
                  }}
                />
                <CardHeader title={persons.name} subheader={persons.role} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* End of Avatar */}
    </Layout>
  );
};

export default AboutUs;

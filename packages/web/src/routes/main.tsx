import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from 'react-router-dom';
import {PostsScreen} from "../screens/posts.screen";
import {PostScreen} from "../screens/post.screen";
import {Box, Flex, Grid} from "@chakra-ui/core";
import {AuthorsScreen} from "../screens/authors.screen";
import {AuthorScreen} from "../screens/author.screen";


export default function App() {
    return (
        <Router>
            <div>
                <Flex align="center" padding={'4vh'} >
                    <Grid templateColumns="repeat(4, 1fr)" gap={6} >
                        <Link to="/">
                            <Box as="button" rounded="md" bg="tomato" color="white" px={4} h={8}>
                                Home
                            </Box>
                        </Link>
                        <Link to="/authors">

                            <Box as="button" rounded="md" bg="tomato" color="white" px={4} h={8} >
                                Author
                            </Box>
                        </Link>
                        <Link to="/posts">

                            <Box as="button" rounded="md" bg="tomato" color="white" px={4} h={8} >
                                Post
                            </Box>
                        </Link>
                    </Grid>
                </Flex>
                <Switch>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/topics">
                        <Topics/>
                    </Route>
                    <Route path="/posts" exact>
                        <PostsScreen/>
                    </Route>
                    <Route path="/posts/:id">
                        <PostScreen/>
                    </Route>
                    <Route path="/authors" exact>
                        <AuthorsScreen/>
                    </Route>
                    <Route path="/authors/:id">
                        <AuthorScreen/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Topics() {
    let match = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>

            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topics/>
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

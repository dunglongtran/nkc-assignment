import React from 'react';
import {Avatar, Badge, Box, Grid, Heading, Icon, Image, Stack} from "@chakra-ui/core";
import {Link} from 'react-router-dom'

export function AuthorsCard({author = {}}: { author: any }) {
    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        baths: 2,
        title: "Modern home in city center in the heart of historic Los Angeles",
        formattedPrice: "$1,900.00",
        reviewCount: 34,
        rating: 4,
        ...author
    };

    return (
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">

            <Box p="6">
                <Box d="flex" alignItems="center">

                    <Avatar size={'xs'} name={author.name} src="https://bit.ly/dan-abramov"/>
                    <Heading size={'xs'}>{author.name}</Heading>
                </Box>

                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    <Link to={`/authors/${author.id}`}>
                        {author.name}
                    </Link>
                </Box>

                <Box>
                    {property.formattedPrice}
                    <Box as="span" color="gray.600" fontSize="sm">
                        / wk
                    </Box>
                </Box>

                <Box d="flex" mt="2" alignItems="center">
                    {Array(5)
                        .fill("")
                        .map((_, i) => (
                            <Icon
                                key={i}
                                name={'star'}
                                color={i < property.rating ? "teal.500" : "gray.300"}
                            />
                        ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {property.reviewCount} reviews
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

import { Link, Text, Code, Container } from '@nextui-org/react'
import Head from 'next/head'

import { Card } from '~/components'

const IndexPage = () => {
  return (
    <Container
      display="flex"
      direction="column"
      alignItems="center"
      justify="center"
      css={{
        p: 0,
        minHeight: '100vh'
      }}
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        as="main"
        display="flex"
        justify="center"
        css={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          my: 'auto',
          p: 0,
          pt: 8
        }}
      >
        <Text h1 size={64} css={{ textAlign: 'center' }}>
          Welcome to{' '}
          <Link color="default" href="https://nextjs.org">
            Next.js!
          </Link>
        </Text>

        <Text h4 size={20} css={{ mb: 8 }}>
          Get started by editing <Code>pages/index.js</Code>
        </Text>

        <Container
          display="flex"
          wrap="wrap"
          alignItems="center"
          justify="center"
          css={{
            gap: 20,
            maxWidth: '800px',
            mt: 10
          }}
        >
          <Card href="https://nextjs.org/docs">
            <Text
              h3
              color="primary"
              size={26}
              css={{ textAlign: 'left', mb: 2 }}
            >
              Documentation &rarr;
            </Text>
            <Text css={{ lineHeight: '$md' }} size={20} color="$gray800">
              Find in-depth information about Next.js features and API.
            </Text>
          </Card>

          <Card href="https://nextjs.org/learn">
            <Text
              h3
              color="primary"
              size={26}
              css={{ textAlign: 'left', mb: 2 }}
            >
              Learn &rarr;
            </Text>
            <Text css={{ lineHeight: '$md' }} size={20} color="$gray800">
              Learn about Next.js in an interactive course with quizzes!
            </Text>
          </Card>

          <Card href="https://github.com/vercel/next.js/tree/master/examples">
            <Text
              h3
              color="primary"
              size={26}
              css={{ textAlign: 'left', mb: 2 }}
            >
              Examples &rarr;
            </Text>
            <Text css={{ lineHeight: '$md' }} size={20} color="$gray800">
              Discover and deploy boilerplate example Next.js projects.
            </Text>
          </Card>

          <Card href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <Text
              h3
              color="primary"
              size={26}
              css={{ textAlign: 'left', mb: 2 }}
            >
              Deploy &rarr;
            </Text>
            <Text css={{ lineHeight: '$md' }} size={20} color="$gray800">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </Text>
          </Card>
        </Container>
      </Container>
    </Container>
  )
}

export default IndexPage

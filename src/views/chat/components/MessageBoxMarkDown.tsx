import ReactMarkdown from 'react-markdown'
import { useColorModeValue } from '@chakra-ui/react'

import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import React from "react";

import 'github-markdown-css/github-markdown.css'
import '../css/custom-markdown.css'

interface MessageBoxMarkDownProps {
  output: string;
}

export default function MessageBoxMarkDown(
  {
    output,
  }: MessageBoxMarkDownProps
) {
  const reactMarkdownStyle = useColorModeValue("markdown-body-light", "markdown-body-dark")

  return (
    <ReactMarkdown
      className={reactMarkdownStyle}
      remarkPlugins={[remarkGfm]}
      components={{
        code: (props: any) => {
          const match = /language-(\w+)/.exec(props.className || "");
          // const {children, className, node, ...rest} = props
          return !props.inline && match ? (
            <SyntaxHighlighter
              children={String(props.children).replace(/\n$/, "")}
              style={atomDark}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code {...props} inline={props.inline ? "true" : undefined}>
              {props.children}
            </code>
          )
        },
        // 목록 UI
        ol: ({ ordered, ...props }) => (
          <ol style={{ paddingLeft: '1.5em', marginBottom: '16px' }} {...props} />
        ),
        ul: ({ ordered, ...props }) => (
          <ul style={{ paddingLeft: '1.5em', marginBottom: '16px' }} {...props} />
        ),
        li: ({ ordered, ...props }) => (
          <li style={{ marginBottom: '10px' }} {...props} />
        ),
        p: (props: any) => (
          <p style={{ marginTop: '6px', marginBottom: '6px', lineHeight: '1.8' }} {...props} />
        ),
        // 제목 UI
        h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
          <h1 style={{ marginTop: '40px', marginBottom: '16px', fontWeight: '600', fontSize: '2em' }} {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
          <h2 style={{ marginTop: '40px', marginBottom: '16px', fontWeight: '600', fontSize: '1.2em' }} {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
          <h3 style={{ marginTop: '40px', marginBottom: '16px', fontWeight: '600', fontSize: '1.2em' }} {...props}>
            {children}
          </h3>
        ),
        // 테이블 UI
        table: (props: any) => (
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "16px", }} {...props} />
        ),
        th: ({ isHeader, ...props }) => (
          <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2", fontWeight: "bold", textAlign: "left", }} {...props} />
        ),
        td: ({ isHeader, ...props }) => (
          <td style={{ border: "1px solid #ddd", padding: "8px" }} {...props} />
        ),
      }}
    >
      {output ? output : ''}
    </ReactMarkdown>
  )
}

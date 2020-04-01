import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "styled-components/macro"
import tw from "tailwind.macro"

const Label = styled.label`
  ${tw`text-2xl font-bold text-pink-300 block mb-3`}
`

const InputStyled = styled.input`
  transition: 0.4s border-color ease-in-out, 0.4s box-shadow ease-in-out;
  ${tw`border border-solid border-4 border-pink-600 focus:border-blue-600 bg-gray-700 text-white px-3 py-2 text-lg focus:outline-none focus:shadow-outline block w-full`}
  ${props => (props.valid ? tw`border-green-600` : null)}
`

const TextArea = styled(InputStyled).attrs({ as: "textarea" })`
  min-height: 200px;
`

const InputGroup = styled.div`
  ${tw`mb-6`}
`

const Button = styled.button`
  transition: 0.4s border-color ease-in-out, 0.4s background-color ease-in-out;
  ${tw`bg-teal-300 px-12 py-4 text-2xl font-bold border-4 border-solid border-teal-600 hover:bg-blue-400 hover:border-blue-700`}
  min-width: 200px;
  &:disabled {
    ${tw`opacity-50`}
  }
`

const OutputBox = styled.div`
  ${tw`border-solid border-4 border-gray-600 bg-gray-700 px-3 py-3 mt-6 text-white`}
`

const ClearButton = styled.button`
  ${tw`bg-purple-800 border-solid border-2 border-pink-800 text-pink-300 px-3 py-2 font-bold`}
  &:disabled {
    ${tw`opacity-50`}
  }
`

const IndexPage = () => {
  const [formState, setFormState] = useState({ inputString: "" })
  const [outputString, setOutputString] = useState()

  const handleOnChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleProcessString = () => {
    try {
      const parsed = parseString(formState.inputString)
      setOutputString(parsed)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    handleProcessString()
  }, [formState.inputString])

  return (
    <Layout>
      <SEO title="Gary" />

      <InputGroup>
        <div css={tw`flex items-center justify-between mb-3`}>
          <Label css={tw`mb-0`}>Input string</Label>
          <div>
            <ClearButton
              disabled={formState.inputString?.length ? null : "disabled"}
              onClick={() => setFormState({ ...formState, inputString: "" })}
            >
              Clear
            </ClearButton>
          </div>
        </div>
        <TextArea
          spellcheck="false"
          name="inputString"
          value={formState.inputString}
          onChange={handleOnChange}
          valid={formState.inputString?.length}
        />
      </InputGroup>

      {/*<div css={tw`flex justify-center py-8`}>
        <Button
          onClick={handleProcessString}
          disabled={formState.inputString?.length ? null : "disabled"}
        >
          Do it
        </Button>
      </div>*/}

      {outputString ? (
        <InputGroup>
          <Label>Output:</Label>
          <OutputBox>{outputString}</OutputBox>
        </InputGroup>
      ) : null}
    </Layout>
  )
}

export default IndexPage

function parseString(initialString = "") {
  const parts = initialString.split(",")

  const outputString = parts
    .map(part => {
      const partSplit = part.split(":")
      if (partSplit.length !== 2) return part
      let delimiter = Math.round(partSplit[1] * 100)
      return `[${delimiter}]${partSplit[0]}[/${delimiter}]`
    })
    .filter(p => p !== false)
    .join(",")

  return outputString
}

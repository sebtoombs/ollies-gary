/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import styled from "styled-components/macro"
import tw from "tailwind.macro"

const Layout = ({ children }) => {
  return (
    <>
      <div css={tw`max-w-2xl mx-auto py-20`}>{children}</div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

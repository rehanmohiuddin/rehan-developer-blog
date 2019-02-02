/* Vendor imports */
import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
/* App imports */
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import * as style from './index.module.less'

const About = ({ data: { profilePhoto, skillIcons, toolIcons } }) => {

  return (
    <Layout>
      <SEO
        title='About'
        description='A brief summary of this blog and my work'
        path='about'
      />
      <div className={style.container}>
        <div className={style.photo}>
          <Img fluid={profilePhoto.childImageSharp.fluid} />
        </div>
        <div className={style.content}>
          <h1>Hi, I'm Luigi!</h1>
          <h2>Software Developer</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus venenatis arcu, cursus pretium enim lacinia nec.
            Duis viverra sagittis neque. Fusce non luctus urna. Vivamus suscipit metus ac posuere egestas. Nunc a pulvinar purus.
            Vivamus nisi mi, fringilla quis lacus et, sagittis mollis massa. Cras tempus massa quis lobortis laoreet.
            Pellentesque metus odio, sagittis nec venenatis non, maximus congue eros. Suspendisse pellentesque purus sit amet ante commodo,
            et molestie mauris aliquet. Proin non nibh libero. Fusce at nulla euismod, condimentum augue quis, convallis justo.
          </p>
          <br />
          <h2>Skills</h2>
          <ImageList edges={skillIcons.edges} />
          <h2>Tools</h2>
          <ImageList edges={toolIcons.edges} />
        </div>
      </div>
    </Layout>
  )
}

const ImageList = ({ edges }) => {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  return (
    <div className={style.iconsContainer}>
      {
        edges
        .sort((edgeA, edgeB) => edgeA.node.name.toLowerCase() > edgeB.node.name.toLowerCase() ? 1 : -1)
        .map(({ node: { name, childImageSharp } }) => (
          <div className={style.iconWrapper} key={name}>
            <Img fixed={childImageSharp.fixed} alt={name} title={name}/>
            <label>{iconsNameMap[name] ? iconsNameMap[name] : capitalize(name)}</label>
          </div>
        ))
      }
    </div>
  )
}

// Use to set specific icons names
const iconsNameMap = {
  'css': 'CSS',
  'html': 'HTML',
  'jquery': 'JQuery',
  'nodejs': 'Node.js',
  'vuejs': 'Vue.js',
  'gruntjs': 'Grunt.js'
}

export const query = graphql`
{
  profilePhoto: file (name: { eq: "profile-photo" }) {
    childImageSharp {
      fluid (maxWidth: 800) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  skillIcons: allFile ( filter: { dir: { regex: "/about/skills$/" } }) {
    edges {
      node {
        name
        childImageSharp {
          fixed (width: 50) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
  }
  toolIcons: allFile ( filter: { dir: { regex: "/about/tools$/" } }) {
    edges {
      node {
        name
        childImageSharp {
          fixed (width: 50) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
  }
}
`

export default About
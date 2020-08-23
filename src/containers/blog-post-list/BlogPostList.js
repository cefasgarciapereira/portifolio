import React from 'react';
import { withStyles } from '@material-ui/styles';
import { useStaticQuery, graphql } from 'gatsby';

import { BlogPost } from 'components';

import useBlogPosts from './useBlogPosts';
import styles from './style';

type Props = {
  classes: Object,
};

const BlogPostList = ({ classes }: Props) => {
  
  const allContentfulBlogPost = useStaticQuery(
    graphql`
      query{
        allContentfulWork{
          edges{
            node{
              title,
              body{
                json
              },
              heroImage{
                fluid(maxWidth: 960) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
      }
    `
  );

  console.log(allContentfulBlogPost)

  return (
    <div className={classes.container}>
      {allContentfulBlogPost.allContentfulWork.edges.map(({ node }, index) => (
        <BlogPost key={index} data={node} />
      ))}
    </div>
  );
};

export default withStyles(styles)(BlogPostList);

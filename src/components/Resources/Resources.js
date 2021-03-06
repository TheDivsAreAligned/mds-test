// React
import React from "react";
// MUI
import {
  Grid,
  Typography,
  useMediaQuery,
  Link as MuiLink
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
// App
import Personas from "../Personas";
import PersonaCard from "./PersonaCard/PersonaCard";
// End Imports

/**
 * @name useStyles
 * @desc This function utilizes JSS to add Component-specific styles.
 * @todo Go through all useStyle functions to remove duplicated styles, and convert to global styles
 */
const useStyles = makeStyles({
  root: {
    padding: "1.25rem",
    margin: ".5rem"
  }
});

/**
 * @function* @name useWidth
 * @returns { String }
 * @desc This function utlizes the `breakpoints`, and `media queries` as defined in `theme.json` to determine the current
 * `viewport size` of the user
 * @todo Remove from component level: Figure out way to handle this global using the same approach.
 */
/* istanbul ignore next */
function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

/**
 * @name _DEVRESOURCES_
 * @type { Object }
 * @todo Create service that handles async loading of all text-based assets
 */
const _DEVRESOURCES_ = Array(4).fill({
  type: "dev",
  title: "Lorem ipsum dolor",
  meta: "Lorem ipsum dolor sit amet",
  desc:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex",
  link: "Lorem ipsum dolor"
});

/**
 * @name _UXRESOURCES_
 * @type { Object }
 * @todo Create service that handles async loading of all text-based assets
 */
const _UXRESOURCES_ = Array(4).fill({
  type: "ux",
  title: "Lorem ipsum dolor",
  meta: "Lorem ipsum dolor sit amet",
  desc:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex",
  link: "Lorem ipsum dolor"
});

export const Resources = () => {
  // Styles
  const classes = useStyles();
  const width = useWidth();
  // Component
  return (
    <section id="Resources">
      <Personas />
      <div className={classes.root}>
        {width !== "xs" ? (
          <>
            <Typography variant="h5" align="center">
              Design System Resources
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="secondary"
              className={
                width === "md" || width === "lg" ? classes.extraPadding : ""
              }
            >
              Our Design System is in its earliest stages of development.
              Available below are resources we're actively evolving in
              collaboration with the design and development community. Want to
              collaborate with us or have ideas or comments?
              <MuiLink color="inherit" href="mailto:design_system@mckinsey.com">
                Contact us
              </MuiLink>
            </Typography>
          </>
        ) : null}
        <Grid container justify="center" classes={classes.resourceCont}>
          <Grid item xs={width !== "xs" ? 8 : 12}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                {_UXRESOURCES_.map((resource, key) => {
                  return resource ? (
                    <PersonaCard key={key} resource={resource} />
                  ) : null;
                })}
              </Grid>
              <Grid item xs={12} sm={6}>
                {_DEVRESOURCES_.map((resource, key) => {
                  return resource ? (
                    <PersonaCard key={key} resource={resource} />
                  ) : null;
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default Resources;

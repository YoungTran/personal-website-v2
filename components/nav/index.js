import { Fade, List, ListItem, makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import React, { useEffect, useState } from "react";

const drawerWidth = 240;
const useStyles = makeStyles({
  drawerPaper: {
    background: "#3b82f6",
    width: drawerWidth,
  },
});
export default function Nav(props) {
  const classes = useStyles();
  const [isActive, setIsActive] = useState("");
  let prevScrollPos = window.pageYOffset;
  const [visible, setVisible] = useState("visible");
  const [boxShadow, setBoxShadow] = useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    if (isActive.length > 0) {
      setIsActive("");
    } else {
      setIsActive("is-active");
    }
  };
  const handleNavClick = () => {
    setMobileOpen(!mobileOpen);
    if (isActive.length > 0) {
      setIsActive("");
    } else {
      setIsActive("is-active");
    }
  };
  const handleScroll = (e) => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos ? "visible" : "invisible";
    if (currentScrollPos < 150) {
      setBoxShadow("");
    }
    setVisible(visible);
    if (visible === "visible" && currentScrollPos > 150)
      setBoxShadow("shadow-2xl blur");
    else {
      setBoxShadow("");
    }
    prevScrollPos = currentScrollPos;
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, false);
    return () => window.removeEventListener("scroll", handleScroll, false);
  }, []);

  const drawer = (
    <div className="flex justify-center mt-10">
      <List>
        <ListItem button key="about" onClick={handleNavClick}>
          <a
            className="walterTurncoat text-theme-regular-white text-2xl"
            href="/#about"
          >
            About
          </a>
        </ListItem>

        <ListItem button key="experience" onClick={handleNavClick}>
          <a
            className="walterTurncoat text-theme-regular-white text-2xl"
            href="/#experience"
          >
            Experience
          </a>
        </ListItem>

        <ListItem button key="work" onClick={handleNavClick}>
          <a
            className="walterTurncoat text-theme-regular-white text-2xl"
            href="/#work"
          >
            Work
          </a>
        </ListItem>

        <ListItem button key="contact" onClick={handleNavClick}>
          <a
            className="walterTurncoat text-theme-regular-white text-2xl"
            href="/#contact"
          >
            Contact
          </a>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={`w-full sm:px-14 mx-auto fixed z-50 ${boxShadow}`}>
      <Fade in={visible === "visible"}>
        <nav className={`sm:flex items-center justify-between py-5 hidden`}>
          <img src="/logo-2.svg" alt="logo-2" className="h-10 w-28" />
          <div className="flex text-xl items-center space-x-20">
            <a className="nav-link" href="/#about">
              About
            </a>

            <a className="nav-link" href="/#experience">
              Experience
            </a>

            <a className="nav-link" href="/#work">
              Work
            </a>

            <a className="nav-link" href="/#contact">
              Contact
            </a>

            <a className="resume-btn" href="/YoungTran.pdf" target="_blank">
              Resume
            </a>
          </div>
        </nav>
      </Fade>

      {/* TODO: mobile nav */}
      <Fade in={visible === "visible"}>
        <nav className="flex justify-between sm:hidden p-5">
          <img src="/logo-2.svg" className="h-10 w-28" alt="logo-2" />

          <button
            className={`hamburger hamburger--spring ${isActive}`}
            type="button"
            onClick={handleDrawerToggle}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Fade>
    </div>
  );
}
import React, { useState } from "react";
// Material
import { Icon } from "@material-ui/core";
import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';

// ------------------------------------------------------------------------------

const SORT_BY_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' }
];

export default function ShopProductSort() {
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget)
    }

    const handleClose = () => {
        setOpen(null);
    }

    return (
        <>
            <Button color="inherit"
                disableRipple
                onClick={handleOpen}
                endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
            >
                Sort By:&nbsp;
                <Typography
                    component="span" variant="subtitle2"
                    sx={{ color: 'text.secondary' }}
                >
                    Newest
                </Typography>
            </Button>
            <Menu
                keepMounted
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}
                transformOrigin={{ vertical: 'top', horizontal: "right" }}
            >
                {
                    SORT_BY_OPTIONS.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === 'newest'}
                            onClick={handleClose}
                            sx={{ typography: "body2" }}
                        >
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}
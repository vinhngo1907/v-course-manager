import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		flexShrink: 0,
		width: DRAWER_WIDTH
	}
}));

const AccountStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2, 2.5),
	borderRadius: theme.shape.borderRadiusSm,
	backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
	profile: PropTypes.object,
	isOpenSidebar: PropTypes.bool,
	onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ profile, isOpenSidebar, onCloseSidebar }) {
	const { pathname } = useLocation();

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<Scrollbar
			sx={{
				height: '100%',
				'& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
			}}
		>
			<Box sx={{ px: 2.5, py: 3 }}>
				<Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
					<Logo />
				</Box>
			</Box>

			{profile && (
				<Box sx={{ mb: 5, mx: 2.5 }}>
					<Link underline="none" component={RouterLink} to="#">
						<AccountStyle>
							<Avatar src={account.photoURL} alt="photoURL" />
							<Box sx={{ ml: 2 }}>
								<Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
									{profile.fullName}
								</Typography>
								<Typography variant="body2" sx={{ color: 'text.secondary' }}>
									{profile.role}
								</Typography>
							</Box>
						</AccountStyle>
					</Link>
				</Box>
			)}

			<NavSection navConfig={sidebarConfig} />
		</Scrollbar>
	);

	return (
		<RootStyle>
			<MHidden width="lgUp">
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{
						sx: { width: DRAWER_WIDTH }
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>

			<MHidden width="lgDown">
				<Drawer
					open
					variant="persistent"
					PaperProps={{
						sx: {
							width: DRAWER_WIDTH,
							bgcolor: 'background.default'
						}
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>
		</RootStyle>
	);
}

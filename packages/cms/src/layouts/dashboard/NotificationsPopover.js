import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';

// Materials
import { alpha } from '@material-ui/core/styles';
import { IconButton, Badge, Typography } from "@material-ui/core";
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// Components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

// ---------------------------------------------------

function renderContent(notification) {
    const title = (
        <Typography variant="subtitle2">
            {notification.title}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                &nbsp; {noCase(notification.description)}
            </Typography>
        </Typography>
    );

    if (notification.type === 'order_placed') {
        return {
            avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
            title
        };
    }
    if (notification.type === 'order_shipped') {
        return {
            avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
            title
        };
    }
    if (notification.type === 'mail') {
        return {
            avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
            title
        };
    }
    if (notification.type === 'chat_message') {
        return {
            avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
            title
        };
    }
    return {
        avatar: <img alt={notification.title} src={notification.avatar} />,
        title
    };
}

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired
};

const NOTIFICATIONS = [
    {
        id: faker.datatype.uuid(),
        title: 'Your order is placed',
        description: 'waiting for shipping',
        avatar: null,
        type: 'order_placed',
        createdAt: set(new Date(), { hours: 10, minutes: 30 }),
        isUnRead: true
    },
    {
        id: faker.datatype.uuid(),
        title: faker.name.findName(),
        description: 'answered to your comment on the Minimal',
        avatar: mockImgAvatar(2),
        type: 'friend_interactive',
        createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
        isUnRead: true
    },
    {
        id: faker.datatype.uuid(),
        title: 'You have new message',
        description: '5 unread messages',
        avatar: null,
        type: 'chat_message',
        createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
        isUnRead: false
    },
    {
        id: faker.datatype.uuid(),
        title: 'You have new mail',
        description: 'sent from Guido Padberg',
        avatar: null,
        type: 'mail',
        createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
        isUnRead: false
    },
    {
        id: faker.datatype.uuid(),
        title: 'Delivery processing',
        description: 'Your order is being shipped',
        avatar: null,
        type: 'order_shipped',
        createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
        isUnRead: false
    }
];

function NotificationItem({ notification }) {

}
export default function NotificationsPopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
    const handleOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

    return(
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                color={open ? 'primary' : 'default'}
                sx={{
                    ...(open && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
                    })
                }}
            >
                <Badge badgeContent={totalUnRead} color="error">
                    <Icon icon={bellFill} width={20} height={20} />
                </Badge>
            </IconButton>
        </>
    )
}
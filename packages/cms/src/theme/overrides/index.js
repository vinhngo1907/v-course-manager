import { merge } from 'lodash';
import Autocomplete from './AutoComplete';
import Backdrop from './Backdrop';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
    return merge(
        Autocomplete(theme),
        Backdrop(theme)
    )
}
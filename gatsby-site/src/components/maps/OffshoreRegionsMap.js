import React from 'react';

import { withPrefixSVG, withPrefix }  from 'components/utils/temp-link'

const OffshoreRegionsMap = (props) => {

    return (
        <g id="OffshoreRegionsMap">
            {props.offshore_regions.map((item, index) => (
                <g key={index}>
                    <a xlinkHref={ withPrefix(item.offshore_region.frontmatter.permalink) } href={ withPrefix(item.offshore_region.frontmatter.permalink) }>
                        <g className="state offshore-area feature" fill="true">
                            <title>{item.offshore_region.frontmatter.title }</title>
                            <use xlinkHref={withPrefixSVG("/maps/offshore/all.svg#")+item.offshore_region.frontmatter.unique_id }  aria-label={ item.offshore_region.frontmatter.title }></use>
                        </g>
                    </a>
                    <g className="states mesh">
                        <use xlinkHref={withPrefixSVG("/maps/offshore/all.svg#")+item.offshore_region.frontmatter.unique_id+"-mesh"}></use>
                    </g>
                </g>
            ))}
        </g>
    );
}

export default OffshoreRegionsMap;

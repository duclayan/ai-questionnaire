// This is in conjunction to the goal of turning mermaidjs code to XML Code
// In this approach, we convert svg to json format that we can read
// We then organize the nodes and take the important informations that is required by the xml to better understand.
import { xml2js, js2xml } from 'xml-js';

const convertSvgToDrawio = (svgContent) => {
    const svgJs = xml2js(svgContent, { compact: true });

    const mxGraphModel = {
        _attributes: { dx: '1066', dy: '613', grid: '1', gridSize: '10', guides: '1', tooltips: '1', connect: '1', arrows: '1', fold: '1', page: '1', pageScale: '1', pageWidth: '850', pageHeight: '1100' },
        root: {
            mxCell: [
                { _attributes: { id: '0' } },
                { _attributes: { id: '1', parent: '0' } }
            ]
        }
    };

    const svgRoot = svgJs.svg;

    const gRoot = svgRoot.g.g; // Root nodes
    const edgePaths = gRoot.g[1]; //Edge paths
    const nodes = [];

    // Process Nodes (Rectangles with Labels)
    if (gRoot && gRoot.g) {
        gRoot.g.forEach((nodeGroup) => {
            if (nodeGroup._attributes && nodeGroup._attributes.class === 'nodes') {
                nodeGroup.g.forEach((node) => {

                    if (node.rect) {
                        const transform = node._attributes.transform;
                        const translateValues = transform.substring(transform.indexOf('(') + 1, transform.indexOf(')')).split(', ').map(Number);
                        const x = translateValues[0];
                        const y = translateValues[1];
    
                        const rect = node.rect._attributes;
                        const width = rect.width;
                        const height = rect.height;
    
                        const label = node.g.foreignObject.div.span.p._text;
                        const nodeId = node._attributes.id;
    
                        const cellId = Math.random().toString(36).substr(2, 9);
                        const cell = {
                            _attributes: {
                                id: cellId,
                                parent: '1',
                                vertex: '1',
                                value: label // Store the label text
                            },
                            mxGeometry: {
                                _attributes: {
                                    x: x,
                                    y: y,
                                    width: width,
                                    height: height,
                                    as: 'geometry'
                                }
                            }
                        };
                        mxGraphModel.root.mxCell.push(cell);
                        nodes.push({ id: nodeId, cellId: cellId });
                    }

                })

            }
        });
    }
    // Process Edges (Paths)
    // Process Edges (Paths) and connect nodes
    if (edgePaths && edgePaths.path) {
        const paths = Array.isArray(edgePaths.path) ? edgePaths.path : [edgePaths.path];

        paths.forEach(path => {
            const pathId = path._attributes.id;
            const sourceNodeId = pathId.split('_')[1]; // Extract source node ID from path ID
            const targetNodeId = pathId.split('_')[2]; // Extract target node ID from path ID

            const source = nodes.find(node => sourceNodeId.includes(node.id.split('-')[1]));
            const target = nodes.find(node => targetNodeId.includes(node.id.split('-')[1]));

            if (source && target) {
                const cellId = Math.random().toString(36).substr(2, 9);
                const cell = {
                    _attributes: {
                        id: cellId,
                        parent: '1',
                        edge: '1',
                        source: source.cellId,  //Connect Source Node
                        target: target.cellId,   //Connect Target Node
                        style: 'endArrow=classic;html=1;rounded=0;'  //Basic arrow style, customize as needed
                    },
                    mxGeometry: {
                        _attributes: {
                            relative: '1',
                            as: 'geometry'
                        }
                    }
                };
                mxGraphModel.root.mxCell.push(cell);
            }
        });
    }

    const mxfile = {
        _declaration: { _attributes: { version: '1.0', encoding: 'UTF-8' } },
        mxfile: {
            diagram: {
                mxGraphModel: mxGraphModel
            }
        }
    };

    return js2xml(mxfile, { compact: true, spaces: 2 });
};

export default convertSvgToDrawio;

import '../style/TacticalBoard.css'

export default function TacticalBoard({ svgRef, players, handleMouseDown, handleMouseMove, handleMouseUp }) {
    return (
        <>
            <div id='tacticalBoardMainDiv'>
                <svg
                    ref={svgRef}
                    viewBox="0 0 1000 500"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <rect
                        /*Rectangulo pista*/
                        x={2}
                        y={2}
                        rx={100}
                        ry={100}
                        strokeWidth={1}
                        width={980}
                        height={480}
                        fill='#49acfc'
                    />
                    <rect
                        /*Linea roja central*/
                        x={497.5}
                        y={2}
                        fill='#fc4949'
                        width={5}
                        height={480}
                    />
                    <circle
                        /*Circulo central*/
                        cx={500}
                        cy={250}
                        r={90}
                        fillOpacity={0}
                        strokeWidth={2}
                        stroke='#fc4949'
                    />
                    <circle
                        /*Faceoff 1*/
                        cx={225}
                        cy={100}
                        r={60}
                        fillOpacity={0}
                        strokeWidth={2}
                        stroke='#fc4949'
                    />
                    <circle
                        /*Punto Faceoff 1*/
                        cx={225}
                        cy={100}
                        r={3}
                        fill='#fc4949'
                    />
                    <circle
                        /*Faceoff 2*/
                        cx={225}
                        cy={380}
                        r={60}
                        fillOpacity={0}
                        strokeWidth={2}
                        stroke='#fc4949'
                    />
                    <circle
                        /*Punto Faceoff 2*/
                        cx={225}
                        cy={380}
                        r={3}
                        fill='#fc4949'
                    />
                    <circle
                        /*Faceoff 3*/
                        cx={775}
                        cy={380}
                        r={60}
                        fillOpacity={0}
                        strokeWidth={2}
                        stroke='#fc4949'
                    />
                    <circle
                        /*Punto Faceoff 3*/
                        cx={775}
                        cy={380}
                        r={3}
                        fill='#fc4949'
                    />
                    <circle
                        /*Faceoff 4*/
                        cx={775}
                        cy={100}
                        r={60}
                        fillOpacity={0}
                        strokeWidth={2}
                        stroke='#fc4949'
                    />
                    <circle
                        /*Punto Faceoff 4*/
                        cx={775}
                        cy={100}
                        r={3}
                        fill='#fc4949'
                    />
                    <rect
                        /*Linea gol izquierda*/
                        x={90}
                        y={3}
                        width={2}
                        height={478}
                        fill='#fc4949'
                    />
                    <rect
                        /*Linea gol derecha*/
                        x={891}
                        y={3}
                        width={2}
                        height={478}
                        fill='#fc4949'
                    />
                    <path
                        /*Porteria izquierda*/
                        d="M 91 225 L 75 225 Q 65 225 65 235 L 65 265 Q 65 275 75 275 L 91 275 Z"
                        fill="#ffffff"
                        fillOpacity={0.7}
                        stroke="#fc4949"
                        strokeWidth={2}
                    />
                    <path
                        /*Area izquierda */
                        d="M 92 215 A 35 35 0 0 1 92 285 Z"
                        fill="#fc4949"
                    />
                    <path
                        /*Porteria derecha*/
                        d="M 892 225 L 906 225 Q 916 225 916 235 L 916 265 Q 916 275 906 275 L 892 275 Z"
                        fill="#ffffff"
                        fillOpacity={0.7}
                        stroke="#fc4949"
                        strokeWidth={2}
                    />
                    <path
                        /*Area derecha*/
                        d="M 891 215 A 35 35 0 0 0 891 285 Z"
                        fill="#fc4949"
                    />
                    {players && players.map(player => (
                        <g
                            key={player.id}
                            transform={`translate(${player.x}, ${player.y})`}
                            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(player.id) }}
                            style={{ cursor: 'grab' }}
                        >
                            <circle r={18} fill={player.color} stroke="#ffffff" strokeWidth={2} />
                            <text
                                textAnchor="middle"
                                dy="6"
                                fill={player.textColor}
                                fontSize="14"
                                fontWeight="bold"
                                style={{ userSelect: 'none', pointerEvents: 'none' }}
                            >
                                {player.number}
                            </text>
                        </g>
                    ))}
                </svg>
            </div >
        </>
    )
}
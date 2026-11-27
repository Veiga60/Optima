import '../style/TacticalBoard.css'

export default function TacticalBoard() {
    return (
        <>
            <div id='tacticalBoardMainDiv'>
                <svg viewBox="0 0 1000 500">
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
                        x={890}
                        y={3}
                        width={2}
                        height={478}
                        fill='#fc4949'
                    />
                </svg>
            </div>
        </>
    )
}
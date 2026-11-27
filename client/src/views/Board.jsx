import { useRef, useState } from "react";
import TacticalBoard from "../components/TacticalBoard";

export default function Board() {

    const initialPlayers = [
        { id: '1', number: '10', color: '#1e293b', textColor: '#ffffff', x: 450, y: 250 },
        { id: '2', number: '7', color: '#1e293b', textColor: '#ffffff', x: 400, y: 180 },
        { id: '3', number: '4', color: '#dc2626', textColor: '#ffffff', x: 300, y: 220 },
        { id: '4', number: '1', color: '#f59e0b', textColor: '#000000', x: 120, y: 250 }, // Portero
    ];

    const [players, setPlayers] = useState(initialPlayers);
    const [draggingId, setDraggingId] = useState(null);
    const svgRef = useRef(null);

    const getSVGCoords = (e) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    };

    const handleMouseDown = (id) => {
        setDraggingId(id);
    }

    const handleMouseMove = (e) => {
        if (!draggingId) return;

        const coords = getSVGCoords(e);
        setPlayers(prev => prev.map(p => p.id === draggingId ? { ...p, x: coords.x, y: coords.y } : p
        ));
    }

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    return (
        <TacticalBoard
            svgRef={svgRef}
            players={players}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
        />
    )
}
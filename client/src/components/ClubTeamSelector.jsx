import { useEffect, useState } from 'react';
import '../style/ClubTeamSelector.css';

export default function ClubTeamSelector({ clubTeams, setClubTeamId }) {
    const [selectedClubTeam, setSelectedClubTeam] = useState();

    useEffect(() => {
        if (clubTeams && clubTeams.length > 0 && !selectedClubTeam) {
            setSelectedClubTeam(clubTeams[0].code);
        }
    }, [clubTeams]);

    if (!clubTeams || clubTeams.length === 0) return null;

    return (
        <div className='clubTeamSelectorHeaderBar'>
            <aside className='clubTeamSelectorContainer' aria-label='Selector de categoría'>
                <div className='clubTeamSelectorBadge'>
                    <span className='clubTeamSelectorDot' />
                    <span className='clubTeamSelectorLabel'>Categoría</span>
                </div>
                <div className='clubTeamSelectorPillGroup' role='tablist'>
                    {clubTeams.map((clubTeam) => {
                        const isSelected = clubTeam.code === selectedClubTeam;
                        return (
                            <button
                                key={clubTeam.id}
                                type='button'
                                role='tab'
                                aria-selected={isSelected}
                                className={`clubTeamSelectorPill ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                    setClubTeamId(clubTeam.id);
                                    setSelectedClubTeam(clubTeam.code);
                                }}
                            >
                                <span className='clubTeamSelectorPillText'>
                                    {clubTeam.description}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </aside>
        </div>
    );
}

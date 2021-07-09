import React from "react";
import PropTypes from "prop-types";
import "./legends.css"

function Legends({singleSlotState, duelSlotState}){
    return(
        <div className="cld_slotContainer">
            <div className="cld_slot">
                <p className="cld_slotInfoSize cld_slotInfoSelectedClr" />
                <span className="cld_slotInfoLabel">Selected Date</span>
            </div>
            <div className="cld_slot">
                <p className="cld_slotInfoSize cld_slotInfoDisabledClr" />
                <span className="cld_slotInfoLabel">Disabled Date</span>
            </div>
            {(singleSlotState || duelSlotState) && 
            <div className="cld_slot">
                <p className="cld_slotInfoSize cld_slotInfoAvailableClr" />
                <span className="cld_slotInfoLabel">Available Slots</span>
            </div>
            }
            {duelSlotState && 
            <div className="cld_slot">
                <p className="cld_slotInfoSize cld_slotInfoTotalClr" />
                <span className="cld_slotInfoLabel">Total Slots</span>
            </div>
            }
        </div>
    )
}

Legends.propTypes = {
    singleSlotState: PropTypes.bool.isRequired,
    duelSlotState: PropTypes.bool.isRequired,
};

export default Legends;


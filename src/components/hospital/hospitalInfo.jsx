import React from "react";

const HospitalInfo = ({info}) => {
    return (
        <div>
            {info[0].id}
            {info[0].test}
            {/* {info.map(d => {
                return (<div key={d.id}>
                    {d.name}
                    </div>)
            })} */}
        </div>
    );
};

export default HospitalInfo;
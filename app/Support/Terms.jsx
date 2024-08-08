import { Button } from '@nextui-org/react'
import { Modal } from 'antd'
import React from 'react'

function Terms({ showTerms, setShowTerms }) {
    const rules = [
        'The venue can accommodate a maximum of 50 people due to it being an intimate venue.',
        'The parking lot is currently unavailable due to renovations. This poses a hazard.',
        'All events must conclude and the doors must be closed by 12:00 AM.',
        'Please ensure that your full balance is paid at least 7 days prior to the event.',
        'Glitter and confetti are not allowed as they are difficult to clean.',
        'Bringing in outside alcohol will incur a flat fee of $150, inclusive of the cost for an on-siteguard.',
        'Access to the upstairs office space is strictly prohibited. Only the bathroom is available for use.',
        'Please refrain from blocking the neighbor\'s driveway, standing on their lawn, or gathering in front of their house.',
        'Keep the venue doors closed at all times during use to minimize noise disturbance.',
        'A $150 security deposit is required, which will be refunded within 24 hours after the event, provided that the venue is left undamaged and cleaned.',
    ]
    return (
        <Modal
            closeIcon={(<div className='border-4 relative bottom-2 rounded-full font-extrabold'>
                <Button onPress={() => { setShowTerms(false) }} className={`h-10 w-10 font-bold p-2 text-white hover:  rounded-3xl bg-gray-950 hover:bg-red-900 trans-slow`}>X</Button>
            </div>)}
            footer={(<div></div>)}
            wrapClassName="bg-balck"
            className="modally z-[999]"
            open={showTerms}

        >
            <h1 className="text-2xl font-bold text-center p-4 bg-black text-white">Terms</h1>

            <div className="sticky mb-5  flex-col w-full center p-4  z-10  gap-4 flex font-bold">

                {rules.map((i, index) => <div className='w-1/2 border border-black p-1'>{index + 1}- {i}</div>)}
            </div>

        </Modal>
    )
}

export default Terms
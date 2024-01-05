
const AlertModal = (handleAlertModal, handleDeleteConfirmation)=>{

    return(
        <div className="alert_modal">  
                    <div className="alert_modal-content">
                            <h4>Are you sure, you want to delete this folder?</h4>
                            <div className="alert_modal_button_group">
                                <button className="cancel_btn" onClick={handleAlertModal}>cancel</button>
                                <button className="create_btn" onClick={handleDeleteConfirmation} >Yes</button>
                            </div>
                    </div>     
         
            </div>
    )
}

export default AlertModal
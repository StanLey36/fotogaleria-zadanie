
function AddPhotoCard(props) {
    return (
        <div className= "hero">
        <div id="overlay" style={{display:"none"}}>
            <div className="card-l-design-width">
                <div className="form">
                    <div className="title">
                        <h3>Pridať fotky</h3>
                        <p className="closeOverlay">X</p>
                    </div>
                    <label htmlFor="input-file" id="drop-area">
                        <input type= "file" accept= "images/*" id= "input-file" hidden />
                        <div id="img-view">
                            <div id="img-view-content">
                                <img src="/img/icon.png" alt=""/>
                                <p>Sem presunte fotky</p>
                                <span>alebo</span>
                                <p className="chooseImages">Vyberte súbory</p>
                            </div>
                        </div>
                    </label>
                    <button id="submitButton" type="submit">Pridať</button>
                </div>
                
            </div>
        </div>
    </div>
    );
}

export default AddPhotoCard;
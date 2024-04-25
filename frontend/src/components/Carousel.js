import Carousel from 'react-bootstrap/Carousel';

export default function Carouse() {
    return (
        <Carousel>
            <Carousel.Item>
                <img src="https://source.unsplash.com/random/900x700/?burger" style={{ "height": "250px", "width": "100%" }} />
                <Carousel.Caption>
                    <div className="d-flex ">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://source.unsplash.com/random/900x700/?pizza" style={{ "height": "250px", "width": "100%" }} />
                <Carousel.Caption>
                    <div className="d-flex">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://source.unsplash.com/random/900x700/?momos" style={{ "height": "250px", "width": "100%" }} />
                <Carousel.Caption>
                    <div className="d-flex">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}


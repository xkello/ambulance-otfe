import {Component, Element, h, Host, Listen, Prop, State} from '@stencil/core';

declare global {
  interface Window {
    navigation: any;
  }
}

@Component({
  tag: 'ot-hospital-app',
  styleUrl: 'ot-hospital-app.css',
  shadow: true,
})

export class OtHospitalApp {
  @State() currentView: 'employees' | 'clinic' = 'employees';
  @Prop() basePath: string = "";
  @Prop() apiBase: string;
  @Prop({mutable: true}) hospitalId: string;
  @Element() host!: HTMLElement;
  @State() private isModalOpen = false;
  @State() private modalEntryId = "@new";

  @Listen('view-changed', {target: 'window'})
  async handleViewChanged(ev: CustomEvent<'employees' | 'clinic'>) {
    this.currentView = ev.detail;

    if (ev.detail === 'employees') {
      const list = this.host.shadowRoot!
        .querySelector('ot-hospital-list') as any;
      if (list && typeof list.reload === 'function') {
        await list.reload();
      }
    }
  }

  @Listen('hospital-changed', {target: 'window'})
  async handleHospitalChanged(ev: CustomEvent<string>) {
    console.log('App caught hospital-changed →', ev.detail);
    this.hospitalId = ev.detail;
  }

  componentWillLoad() {
    console.log('ot-hospital-app: componentWillLoad', {
      basePath: this.basePath,
      apiBase: this.apiBase,
      hospitalId: this.hospitalId
    });
  }

  componentDidLoad() {
    console.log('ot-hospital-app: componentDidLoad');
  }

  componentDidUpdate() {
    console.log('ot-hospital-app: componentDidUpdate', {
      isModalOpen: this.isModalOpen,
      modalEntryId: this.modalEntryId
    });
  }

  render() {
    console.log("ot-hospital-app: render", {
      isModalOpen: this.isModalOpen,
      modalEntryId: this.modalEntryId,
      apiBase: this.apiBase,
      hospitalId: this.hospitalId
    });

    const handleEntryClicked = (ev: CustomEvent<string>) => {
      console.log('ot-hospital-app: handleEntryClicked event received', {
        detail: ev.detail,
        currentModalState: this.isModalOpen
      });

      try {
        this.isModalOpen = true;
        this.modalEntryId = ev.detail;
        console.log('ot-hospital-app: Modal state updated', {
          isModalOpen: this.isModalOpen,
          modalEntryId: this.modalEntryId
        });
      } catch (err) {
        console.error('ot-hospital-app: Error handling entry clicked event', err);
      }
    };

    const handleEditorClosed = async (ev: CustomEvent<string>) => {
      console.log('ot-hospital-app: handleEditorClosed event received', {
        detail: ev.detail,
        currentModalState: this.isModalOpen
      });

      try {
        this.isModalOpen = false;
        console.log('ot-hospital-app: Modal closed');
        const list = this.host.shadowRoot!.querySelector('ot-hospital-list') as any;
        if (list && typeof list.reload === 'function') {
          await list.reload();
        }
        console.log('ot-hospital-app: Reloaded list after closing editor');
      } catch (err) {
        console.error('ot-hospital-app: Error handling editor closed event', err);
      }
    };

    return (
      <Host>
        <ot-hospital-navbar
          apiBase={this.apiBase}
          hospitalId={this.hospitalId}
          basePath={this.basePath}
        />

        {this.currentView === 'employees' &&
          <ot-hospital-list
            hospitalId={this.hospitalId}
            apiBase={this.apiBase}
            onentry-clicked={handleEntryClicked}
          />
        }

        {this.currentView === 'clinic' &&
          <div class="clinics-placeholdero">
            {/* TODO: replace with real clinic component */}
            <p>No clinic view implemented yet.</p>
          </div>
        }

        {this.isModalOpen && (
          <div class="modal-overlay" onClick={() => this.isModalOpen = false}>
            <div class="modal-container" onClick={(e) => e.stopPropagation()}>
              <ot-hospital-editor entry-id={this.modalEntryId}
                                 hospitalId={this.hospitalId} apiBase={this.apiBase}
                                 oneditor-closed={handleEditorClosed}>
              </ot-hospital-editor>
            </div>
          </div>
        )}
      </Host>
    );
  }
}
